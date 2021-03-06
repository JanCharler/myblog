from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView, ListView, CreateView, DetailView, UpdateView, DeleteView
from .models import Post, Comment
from .forms import PostForm, CommentForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.core.urlresolvers import reverse, reverse_lazy
from .static import closest_pair
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
import json
# Create your views here.

import pdb

# points = []
# coords = closest_pair.Coordinates(points)

def reset_closest_pair(request):
	
	return redirect('closest_pair')

def process_closest_pair(request):

	if request.method == "POST":

		data_raw = request.body
		data = json.loads(data_raw)
		
		print(data)
		total = len(data)

		# Creating coords list, as it's passed as an object and our/
		# algorithm wants a list of tuples.
		points = []
		for coords in data:
			x = coords['x']
			y = coords['y']
			points.append((x,y))
		print(points)

		# CP algorithm done here
		cp, steps = closest_pair.find_closest_pair(points)

		data = {
		'cp': cp,
		'steps': steps,
		}

		print(f"sending {data}")
		print("\n")
	return JsonResponse({"Results":data})

class ClosestPairProject(TemplateView):
	template_name = 'blog/closest_pair.html'

	def get_context_data(self, **kwargs):
		#coords.clear() # clear data, as page is reset
		# algo_steps.clear()  # clear data, as page is reset
		context = super().get_context_data(**kwargs)
		context['row'] = range(30) #150 #20
		context['col'] = range(10) #75 #10
		return context

class ConnectFourView(TemplateView):
	template_name = "blog/connectfour.html"

class UnderConstructionView(TemplateView):
	template_name = "blog/underconstruction.html"

class PostListView(ListView):
	model = Post

	def get_queryset(self):
		return Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')

class AboutView(TemplateView):
	template_name = 'blog/about.html'

class PostCreateView(LoginRequiredMixin, CreateView):
	login_url = '/login/'
	# redirect_field_name = 'blog/post_list.html'
	model = Post
	form_class = PostForm

class PostDeleteView(LoginRequiredMixin, DeleteView):
	login_url = '/login/'

	model = Post
	success_url = reverse_lazy('post_list')

class PostUpdateView(LoginRequiredMixin, UpdateView):
	login_url = '/login/'
	# redirect_field_name = 'blog/post_list.html'
	model = Post
	form_class = PostForm

class PostDraftView(ListView):
	model = Post
	template_name = "blog/post_draft.html"
	def get_queryset(self):
		return Post.objects.filter(published_date__isnull=True).order_by('created_date')

class PostDetailView(DetailView):
	model = Post

# class CommentCreateView(LoginRequiredMixin, CreateView):
# 	login_url = '/login/'
# 	redirect_field_name = 'blog/post_list.html'

# 	model = Comment
# 	form_class = CommentForm


@login_required
def publish_post(request, pk):
	post = get_object_or_404(Post, pk=pk)
	post.publish()
	return redirect('post_detail', pk=pk)

def add_comment_to_post(request, pk):

	post = get_object_or_404(Post,pk=pk)

	if request.method == "POST":
		form = CommentForm(data=request.POST)
		if form.is_valid():

			comment = form.save(commit=False)
			comment.post = post
			comment.save()
			return redirect("post_detail", pk=post.pk)
	else:
		form = CommentForm()

	return render(request, "blog/comment_form.html", context={'form':form} )

@login_required
def approve_comment(request, pk):
	comment = get_object_or_404(Comment, pk=pk)
	comment.approve()
	return redirect('post_detail', pk=comment.post.pk)

@login_required
def delete_comment(request, pk):
	comment = get_object_or_404(Comment, pk=pk)
	post_pk = comment.post.pk
	comment.delete()
	return redirect('post_detail',pk=post_pk)





