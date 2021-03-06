from django.db import models
from django.utils import timezone
from django.core.urlresolvers import reverse


class Post(models.Model):
	author = models.ForeignKey('auth.User')
	title = models.CharField(max_length=264)
	text = models.TextField()
	created_date = models.DateTimeField(default=timezone.now)
	picture = models.ImageField(upload_to='pictures', blank=True)

	published_date = models.DateTimeField(blank=True, null=True)

	def publish(self):
		self.published_date = timezone.now()
		self.save()

	def approved_comments(self):
		return self.comments.filter(approved_comment=True)

	def get_absolute_url(self):
		return reverse('post_detail',kwargs={'pk':self.pk})

	def __str__(self):
		return self.title

class Comment(models.Model):
	author = models.CharField(max_length=264)
	text = models.CharField(max_length=264)
	created_date = models.DateTimeField(default=timezone.now)
	approved_comment = models.BooleanField(default=False)

	post = models.ForeignKey('blog.Post',related_name="comments")

	def approve(self):
		self.approved_comment = True
		self.save()

	def get_absolute_url(self):
		return reverse('post_detail',kwargs={'pk':self.post.pk}) # leaving this different to the example

	def __str__(self):
		return self.text

