# Editing the website

You can change the website's text, photos, dates and files yourself, using simple forms. You don't need to touch any code.

## Getting in

1. Open **https://app.pagescms.org** and sign in (with the email you were invited with, or with GitHub).
2. Choose **Shane-Riley-Website**.
3. The menu on the left lists everything you can edit.

## What you can edit

| In the menu | What it changes |
| --- | --- |
| **Profile & links** | Name, email, tagline, short bio, location, and profile links (LinkedIn, YouTube…), including the short note under each profile card on the Contact page |
| **Home page** | The big photo at the top, its caption, and the headings |
| **About page** | Intro sentence, biography paragraphs, portrait photo, interests (interests also appear on the résumé) |
| **Résumé** | Everything on the résumé page: jobs, dates, bullet points, skills, phone, and the **PDF** behind the Download button |
| **Contact page** | Heading, intro, and the "Get in touch about" topics |
| **Multimedia** | Videos, game commentary, podcasts and audio |
| **Sports Flash** | The radio segments series |
| **Published elsewhere** | The article lists at the bottom of the Stories page |

The full stories (articles with photos between paragraphs) aren't in the forms, because their layouts are easy to break. Ask a developer for changes to those.

## Making a change

1. Open a section, change what you need, and press **Save**.
2. Wait about two minutes, then refresh the website. Your change is live.

Every save is kept in the history, so nothing is lost. To undo a change, ask a developer to restore the previous version.

### Lists

Jobs, bullet points, skills, interests, links and so on are lists. Use **Add** to add an item, the **⋮** or trash icon to remove one, and drag to reorder. The order in the form is the order on the site.

### Photos

- Click the photo field, then **Upload** a new photo or pick one you uploaded before.
- Use a large, sharp photo: at least 1920 pixels wide for the home page, at least 1200 pixels tall for the portrait. The site automatically makes smaller versions for phones.
- Give every photo a **unique file name**, such as `shane-headshot-2027.jpg`, not `IMG_0001.jpg`. If two photos have the same name, the site won't update.
- Always fill in the **photo description**: one sentence about what's in the picture, read aloud to blind visitors.

### Résumé PDF

In **Résumé**, use the first field to upload the new PDF. The Download PDF button will then serve it.

### Videos and audio

- **YouTube video:** set **Plays** to "A YouTube video" and paste the video ID: the part after `v=` in the link. For `https://www.youtube.com/watch?v=aJX64OC45xk`, that's `aJX64OC45xk`. Upload a thumbnail too: open `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg` (replacing VIDEO_ID), save the image, and upload it.
- **Audio:** set **Plays** to "An uploaded audio file" and upload an MP3.
- **Video files:** keep them under about 50 MB. Ask a developer to shrink bigger ones first.
- **Short name:** every item needs a unique short name in lower case with dashes, like `golf-course-renovations`.
- **First video:** the first **Video** in the list is featured at the top of the Multimedia page and on the home page.

### Sports Flash

Add a segment with its date, its number that day (1 or 2), the MP3 file and its length (like `1:05`). Segments are put in date order automatically.

## If something doesn't show up

If a change doesn't appear after a few minutes, something in it needs fixing. Usually it's a required field left empty, or a photo name used twice. The website keeps showing the last working version in the meantime, so it's never broken for visitors. Tell a developer which section you edited, and they can see the exact message in the site's build log. It names the field, e.g. *"About page → Portrait → image: the image wasn't found."*
