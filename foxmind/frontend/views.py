from django.shortcuts import render


def index(request):
    print("23")
    return render(request, "./frontend/index.html")
