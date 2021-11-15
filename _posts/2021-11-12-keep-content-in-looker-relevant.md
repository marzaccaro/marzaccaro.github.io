---
title: Keep the content of your Looker instance relevant
date: 2021-11-12T11:37:00+00:00
author: Martina Z
layout: post
categories:
  - Looker
---

### Decluttering your Looker instance
If you use Looker (or any other BI tool where users can create content) for long enough you'll appreciate how it's essential to keep it clean, by continuosly removing unused or stale content.

This is what you would do to to keep your wardrobe tidy, when decluttering once in a while. 
If you create a method to do it regularly, it will be much easier to find what you're looking for later.

<iframe src="https://giphy.com/embed/cIoZPitO8sMpAN2Fia" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/netflix-konmari-mariekondo-tidyingup-cIoZPitO8sMpAN2Fia">via GIPHY</a></p>


### The proliferation of content in Looker

Within [Farfetch](https://www.farfetch.com/uk/shopping/women/items.aspx) (ndt), Looker is a well established BI tool: one of its benefits is it's self-service capability, that allows each users to create their own reports.

However, finding the right content is increasingly hard when you have lots of creators and no tags or keywords to use when searching.
Creating new content is quite easy as well: just saving a test dashboard, copying someone else's content, or quickly add a bunch of Explores to a dashboard can be done in a couple of clicks.
Almost everyone using Looker in Farfetch is also a content creator, and there are around 1800+ users (and growing): this can get quite messy if there is no continuous process to archive existing content.

You can ask people to remove content they don’t use anymore, but they likely have other priorities, and they don't probably see the value of archiving content.

As a result, there was a lot of content left unused on our Farfetch Looker instance, causing a few problems:

(1) it's harder to find useful content when using the search bar
(2) the results of the search content are too many
(3) Content Validation [link](https://docs.looker.com/data-modeling/getting-started/look-validation) is very slow, because it's validating all content, lots of which is actually unused.

### The built in method don't suit big Looker instances.
The way Looker documentation suggests bulk archiving unused content, is only available for the Administrators of your Looker instance (see [here](https://docs.looker.com/sharing-and-publishing/admin-spaces)): they'll check the Unused Content folder and manually remove the unused content, selecting appropriate times of non-usage. 
 
There are various problem with this approach when you have many users in your instance.

(1) The number of Admin, needs to be low (especially for Legal and Compliance reasons), so this process is available to few people, who often wouldn't know if a specific report is useful or not.
(2) Checking with the users one by one, before archiving anything, wouldn’t be scalable and knowing if the content is still relevant for all the Business Functions, would be just impossible.
(3) Looker Unused Content folder is excluding favourite content, which may be not relevant anymore. The fact that by default you can’t archive content that is favourite, but not used is a bit of a limitation, given the amount of users of our instance and the fact that everyone can favourite content.


### Creating a more robust workflow, integrating with Collibra

Farfetch uses [Collibra](https://www.collibra.com/us/en) as Data Catalog, to facilitate searching data across multiple platforms (ie. Data Lakes and other BI tools all flow into this portal, to ensure discoverability and governance across the organization).

We used custom Looks from the Content Usage Explore in the System Activity model (see [here](https://docs.looker.com/admin-options/tutorials/system-activity#content_usage))
We defined the criteria for which content could be archived, starting with fairly relaxed one, ie. 1 year of non-usage and not used in API calls, embedding or schedules.
We decided to run this monthly, because that’s enough to keep our instance clean; without bothering to much the users, maybe quarterly could be just enough.

We defined for Looks and Dashboard a specific attribute in Collibra called “Never Delete” to tag content, that even if unused is still important. This content could be used for historical analysis or contains important commentary that the users want to keep 
Every month we select the content that is candidate for archiving, notify the content creators, and give 2 weeks to review the content and tag it with the Never Delete Flag, in case they do want to keep it. If they don’t do anything the content is going to be archived. Users need to actively opt-in to keep the content, otherwise the content will be archived.
After the 2 weeks, we archive the content, unless it has a Never Delete Flag against it.
We don’t hard-delete content, but just move it to the trash, where - if needs be - it can be restored by an Administrator. Even though after running this process twice we haven’t yet have to restore anything, this become more common, when considering content unused for 6 months or when running the archival process in summer, when more people are on holidays.

[Add screenshot of a diagram here]


How did we do it?
[Technical implementation or mention the elements you would need] 
Improvement, how can you do this too?
What would we have liked to have in Looker to improve the process?
A system to tag content native to Looker, this could be used to flag useful content and improve search result as well - plus we could have asked people to tag content directly in Looker instead of another system
We could have cleared favourites and ask people to use the favourite icon to save content that they would like to keep - but then we’d overload the “favourite” concept with some new meanings, making the favourite feature less useful.

What can be improved and limitations?
We used Collibra to tag content with a Never Delete flag, but this leaves outside of the system: needs to sync with Collibra
The email is not yet automated but potentially can be using Airflow Email Operators [link]
Sometimes users keep schedules of reports that they aren’t actually important or they are no longer using, but we preferred to be conservative and keep reports that are scheduled
If the creator of the content has since left the company, but they created Dashboards or Looks relevant to someone else than the creator: in this case the default behaviour would be archiving. Usually though, really important content is consistently used, and not left unused for a while.
