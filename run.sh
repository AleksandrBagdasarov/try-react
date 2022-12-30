#!/bin/bash

cd foxmind && python manage.py migrate && python manage.py runserver