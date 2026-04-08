from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create(email='test@hero.com', name='Test Hero', team='marvel', is_superhero=True)
        self.assertEqual(user.email, 'test@hero.com')
        self.assertTrue(user.is_superhero)

    def test_team_creation(self):
        team = Team.objects.create(name='marvel', description='Marvel Team')
        self.assertEqual(team.name, 'marvel')

    def test_activity_creation(self):
        user = User.objects.create(email='test2@hero.com', name='Test2 Hero', team='dc', is_superhero=True)
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2023-01-01')
        self.assertEqual(activity.type, 'run')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do pushups', difficulty='easy')
        self.assertEqual(workout.name, 'Pushups')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='dc', description='DC Team')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)
