# Generated by Django 4.2.6 on 2024-04-22 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('servicename', models.CharField(choices=[('Maid', 'Maid'), ('Carpet', 'Carpet'), ('Tile', 'Tile')], max_length=50)),
                ('servicedescription', models.TextField(max_length=1000)),
                ('services_image', models.ImageField(upload_to='services')),
            ],
        ),
    ]
