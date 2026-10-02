from rest_framework.permissions import BasePermission
class IsRecruiter(BasePermission):
    def has_permission(self,request,view):
        return request.user.role=="recruiter"

class IsJobseeker(BasePermission):
    def has_permission(self,request,view):
        return (request.user.is_authenticated and request.user.role=='jobseeker')


class IsCompanyOwner(BasePermission):
    """
    Only the owner of the company can update/delete it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsApplicationOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.applicant==request.user