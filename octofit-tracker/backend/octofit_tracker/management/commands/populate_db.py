from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data in batches to avoid unhashable model instance errors
        for model in [Activity, Leaderboard, Workout, User, Team]:
            qs = model.objects.all()
            for obj in qs:
                if obj.pk:
                    obj.delete()
        

        # Create Teams
        marvel = Team.objects.create(id=1, name='Team Marvel', description='Marvel superheroes')
        dc = Team.objects.create(id=2, name='Team DC', description='DC superheroes')

        # Create Users (Superheroes)
        users = [
            User.objects.create(id=1, name='Tony Stark', email='tony@marvel.com', team=marvel.name, is_superhero=True),
            User.objects.create(id=2, name='Steve Rogers', email='steve@marvel.com', team=marvel.name, is_superhero=True),
            User.objects.create(id=3, name='Bruce Wayne', email='bruce@dc.com', team=dc.name, is_superhero=True),
            User.objects.create(id=4, name='Clark Kent', email='clark@dc.com', team=dc.name, is_superhero=True),
        ]

        # Create Workouts
        workouts = [
            Workout.objects.create(id=1, name='Push Ups', description='Upper body workout', difficulty='Medium'),
            Workout.objects.create(id=2, name='Running', description='Cardio workout', difficulty='Easy'),
        ]

        # Create Activities
        from datetime import date
        Activity.objects.create(id=1, user=users[0], type='Push Ups', duration=30, date=date.today())
        Activity.objects.create(id=2, user=users[1], type='Running', duration=45, date=date.today())
        Activity.objects.create(id=3, user=users[2], type='Push Ups', duration=20, date=date.today())
        Activity.objects.create(id=4, user=users[3], type='Running', duration=60, date=date.today())

        # Create Leaderboard entries
        Leaderboard.objects.create(id=1, team=marvel, points=550)
        Leaderboard.objects.create(id=2, team=dc, points=650)

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with test data.'))
