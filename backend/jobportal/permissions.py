from rest_framework.permissions import BasePermission

class IsRecruiter(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'role', None) == 'recruiter')

class IsJobseeker(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'role', None) == 'jobseeker')

class IsCompanyOwner(BasePermission):
    """
    Only the owner of the company can update/delete it.
    """
    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and obj.owner == request.user)

class IsApplicationOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and obj.applicant == request.user)