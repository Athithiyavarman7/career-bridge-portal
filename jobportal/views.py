from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import User, Company, Jobs, Application
from .serializers import UserSerializer, CompanySerializer, JobsSerializer, ApplicationSerializer, RegisterSerializer,UserProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    # Anyone can view companies, but you must be logged in to create one
    permission_classes = [IsAuthenticatedOrReadOnly] 

    def perform_create(self, serializer):
        # Automatically sets the logged-in user as the owner of the company
        serializer.save(owner=self.request.user)

class JobsViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["location", "jobtype", "company"]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Automatically sets the logged-in user as the applicant
        serializer.save(applicant=self.request.user)

# --- AUTHENTICATION VIEWS ---

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Generate JWT Tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role,    
        })
    else:
        return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])

def profile(request):
    # Serializes the currently authenticated user
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)