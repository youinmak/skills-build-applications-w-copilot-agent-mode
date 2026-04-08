from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='Team DC', description='DC superheroes')

        # Create Users (Superheroes)
        users = [
            User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel.name, is_superhero=True),
            User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel.name, is_superhero=True),
            User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc.name, is_superhero=True),
            User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc.name, is_superhero=True),
        ]

        # Create Workouts
        workouts = [
            Workout.objects.create(name='Push Ups', description='Upper body workout', difficulty='Medium'),
            Workout.objects.create(name='Running', description='Cardio workout', difficulty='Easy'),
        ]

        # Create Activities
        from datetime import date
        Activity.objects.create(user=users[0], type='Push Ups', duration=30, date=date.today())
        Activity.objects.create(user=users[1], type='Running', duration=45, date=date.today())
        Activity.objects.create(user=users[2], type='Push Ups', duration=20, date=date.today())
        Activity.objects.create(user=users[3], type='Running', duration=60, date=date.today())

        # Create Leaderboard entries
        Leaderboard.objects.create(team=marvel, points=550)
        Leaderboard.objects.create(team=dc, points=650)

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with test data.'))
