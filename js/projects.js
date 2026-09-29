/**
 * ============================================================
 *  YOUR PROJECTS — add, remove or reorder freely
 * ============================================================
 *  Each project needs:
 *    title     – shown large under the thumbnail
 *    category  – small text, e.g. "Brand Film"
 *    poster    – thumbnail image (JPG/WebP, ~900px wide, < 200 KB)
 *    preview   – short muted loop for the grid (optional, ~5 s, < 2 MB)
 *    video     – the full film that opens when clicked (MP4, H.264)
 *
 *  YouTube / Vimeo also work for `video`:
 *    video: "https://www.youtube.com/embed/VIDEO_ID"
 *    video: "https://player.vimeo.com/video/VIDEO_ID"
 *
 *  Videos can be local files (media/projects/...) or full links
 *  (e.g. Cloudinary: https://res.cloudinary.com/...). Thumbnails stay in media/projects/.
 *
 *  featured: true  → shows full-width at the top of the grid (best for
 *                    horizontal 16:9 films). Use it on one project at a time.
 */

const PROJECTS = [
  {
    title: "Gatekept",
    category: "Clothing Brand Film · Oxford Boxy Shirt",
    poster: "media/projects/gatekept.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718658/gatekept-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718659/gatekept.mp4",
    featured: true,
  },
  {
    title: "The Glenlivet",
    category: "Event Film",
    poster: "media/projects/project-1.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790719045/project-1-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790719048/project-1.mp4",
  },
  {
    title: "Audi Q3",
    category: "Automotive Film",
    poster: "media/projects/project-2.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718657/project-2-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718660/project-2.mp4",
  },
  {
    title: "Lamborghini Temerario",
    category: "Showroom Reel",
    poster: "media/projects/project-3.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718658/project-3-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718661/project-3.mp4",
  },
  {
    title: "HYROX Delhi",
    category: "Event / Production",
    poster: "media/projects/project-4.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718661/project-4-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718661/project-4.mp4",
  },
  {
    title: "Land Rover Defender",
    category: "Automotive Reel",
    poster: "media/projects/project-5.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718659/project-5-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718661/project-5.mp4",
  },
  {
    title: "Lamborghini Urus",
    category: "Brand Film",
    poster: "media/projects/project-6.jpg",
    preview: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718661/project-6-preview.mp4",
    video: "https://res.cloudinary.com/latdrj6e/video/upload/v1790718665/project-6.mp4",
  },
];
