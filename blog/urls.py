from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.PostListView.as_view(), name="post_list"),
	url(r'^about/$', views.AboutView.as_view(), name="about"),
	url(r'^create/$', views.PostCreateView.as_view(), name='create'),
	url(r'^post/(?P<pk>\d+)$', views.PostDetailView.as_view(), name="post_detail"),
	url(r'^drafts/$' , views.PostDraftView.as_view(), name="draft_view"),
	url(r'^post/(?P<pk>\d+)/publish/$', views.publish_post, name="post_publish"),
	url(r'^post/(?P<pk>\d+)/addcomment/$', views.add_comment_to_post, name="post_add_comment"),
	url(r'^post/(?P<pk>\d+)/approvecomment/$', views.approve_comment, name="approve_comment"),
	url(r'^post/(?P<pk>\d+)/removecomment/$', views.delete_comment, name="delete_comment"),
	url(r'^update/(?P<pk>\d+)$', views.PostUpdateView.as_view(), name='post_update'),
	url(r'^delete/(?P<pk>\d+)$', views.PostDeleteView.as_view(), name="post_delete"),
	url(r'^closestpair/$', views.ClosestPairProject.as_view(), name='closest_pair'),
	url(r'^closestpair/process/$', views.process_closest_pair, name='process'),
	#url(r'^closestpair/process/col=(?P<col>\d+)&row=(?P<row>\d+)&total=(?P<total>\d+)/$', views.process_closest_pair, name='process'),
	url(r'^closestpair/reset/$', views.reset_closest_pair, name="reset"),

]