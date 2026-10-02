from rest_framework import serializers
from .models import User, Company, Jobs, Application

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
        # Makes sure the owner is set automatically in views, not by the user typing it
        read_only_fields = ["owner"] 

class JobsSerializer(serializers.ModelSerializer):
    # This sends the company name alongside the ID to React (very helpful for UI!)
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Jobs
        fields = "__all__"

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email", "role"]
        extra_kwargs = {"password": {"write_only": True}} # Hides password from API responses

    def create(self, validated_data):
        # Hashes the password securely before saving
        user = User.objects.create_user(**validated_data)
        return user



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'bio', 'resume']
        read_only_fields = ['id', 'username', 'role']