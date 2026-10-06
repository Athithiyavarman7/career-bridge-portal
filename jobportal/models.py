from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# 1. USER MODEL: Defines your custom user (Jobseeker vs Recruiter)
class User(AbstractUser):
    CHOICES = [
        ('jobseeker', 'Job Seeker'),
        ('recruiter', 'Recruiter')
    ]
    role = models.CharField(max_length=20, choices=CHOICES, default='jobseeker')

    def __str__(self):
        return self.username


# 2. COMPANY MODEL: A recruiter must create a company to post jobs.
class Company(models.Model):
    # If the user is deleted, their company is also deleted (CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


# 3. JOB MODEL: The jobs posted by the company.
class Jobs(models.Model):
    # Cleaned up choices to match normal form inputs!
    JOB_TYPES = [
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Internship', 'Internship'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True) # Added this for you!
    location = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    jobtype = models.CharField(max_length=20, choices=JOB_TYPES)

    def __str__(self):
        return self.title


# 4. APPLICATION MODEL: When a jobseeker applies to a job.
class Application(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("SHORTLISTED", "Shortlisted"),
        ("REJECTED", "Rejected"),
        ("HIRED", "Hired"),
    )

    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey(Jobs, on_delete=models.CASCADE)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevents a user from applying to the same job twice
        constraints = [
            models.UniqueConstraint(fields=["applicant", "job"], name="unique_applicant_job")
        ]

    def __str__(self):
        return f"{self.applicant.username} applied to {self.job.title}"

    class Profile(models.Model):

        username=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
        resume = models.FileField(upload_to="resumes/", blank=True, null=True)
        def __str__(self):

            return f"{self.user.username}'s Profile"