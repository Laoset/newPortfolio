export default async function sitemap() {
  const staticSitemap = [
    {
      url: 'https://kevincorman.vercel.app/',
      lastModified: new Date()
    }
  ];

  return [...staticSitemap];
}
