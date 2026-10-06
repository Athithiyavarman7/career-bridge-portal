from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login
from .views import UserViewSet, CompanyViewSet, JobsViewSet, ApplicationViewSet,register,profile
from rest_framework_simplejwt.views import(
    TokenObtainPairView,TokenRefreshView
)

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'jobs', JobsViewSet)
router.register(r'applications', ApplicationViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path("profile/",profile),
    path("register/",register),
    path("login/", login),

    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),


    path('', include(router.urls)),
]