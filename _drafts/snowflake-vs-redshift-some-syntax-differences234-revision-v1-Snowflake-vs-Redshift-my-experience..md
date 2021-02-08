---
id: 235
title: 'Snowflake vs Redshift: my experience.'
date: 2019-09-17T06:31:40+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2019/09/17/234-revision-v1/
permalink: /2019/09/17/234-revision-v1/
---
#### Dialect is similar to Redshift, with some distinction

IFNULL

String concatenation

Timezone

Aliases * cool 

Is more strict then Redshift in a lot of things, which is not a bad thing at all &#8211; link to Tristan Handy article

#### DBA like activities

No vacuming, indexing (zipping) : dba like activity that consume time

Different server for computation and storage: not clear really

#### Performance

Perform better with less effort (seeing this especially with Looker )

dealing with unstructured data is not so good

#### Database / Permissioning and Schemas

Differently to Redshift you can have different databases (catalog) under the same connection string &#8211; so no hassle of having different user per connection string &#8211; moreover every single user has is own login &#8211; without the burden of organizing it properly

PII features > this is cool even though I have not tested secure views yet

##