# Boom Scorer - Deployment Package

## 📦 Package Contents

- `index.html` - Main application file (Boom Scorer web app)
- `favicon.svg` - Website icon (green "B" logo)
- `sitemap.xml` - SEO sitemap for search engines
- `robots.txt` - Search engine crawler instructions
- `.htaccess` - Apache server configuration
- `README.md` - This file

## 🚀 Deployment Instructions

### Option 1: cPanel Upload (Recommended)
1. Log into your cPanel account
2. Go to **File Manager**
3. Navigate to `public_html` folder (or your domain's root folder)
4. Click **Upload** button
5. Upload ALL files from this package
6. Make sure `index.html` is in the root directory
7. Done! Visit: https://boomscorer.fastbusiness.co.za

### Option 2: FTP Upload
1. Connect to your server via FTP (FileZilla, etc.)
2. Upload all files to your web root directory
3. Ensure file permissions are correct (644 for files, 755 for folders)
4. Done!

### Option 3: Command Line (SSH)
```bash
# Upload the zip file to your server, then:
cd /path/to/public_html
unzip boom-scorer-deploy.zip
chmod 644 index.html sitemap.xml robots.txt
chmod 644 .htaccess
chmod 644 favicon.svg
```

## ✅ Post-Deployment Checklist

1. **Test the website**: Visit https://boomscorer.fastbusiness.co.za
2. **Check HTTPS**: Make sure it redirects to HTTPS (SSL certificate required)
3. **Test mobile**: Open on your phone to check responsiveness
4. **Submit to Google**: 
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property: `boomscorer.fastbusiness.co.za`
   - Submit your sitemap: `https://boomscorer.fastbusiness.co.za/sitemap.xml`

## 🎨 Favicon Setup

The `favicon.svg` is automatically loaded by modern browsers. For older browser support, you can generate additional formats at:
- https://realfavicongenerator.net/

Upload the `favicon.svg` and it will create:
- `favicon.ico` (for older browsers)
- `apple-touch-icon.png` (for iOS)
- `android-chrome-192x192.png` (for Android)

## 💰 Google AdSense Setup

1. **Apply for AdSense**: https://www.google.com/adsense
2. **Wait for approval** (usually 1-2 weeks)
3. **Get your ad code**
4. **Add ad code** to `index.html`:
   - Search for `<div class="ad-zone">`
   - Replace placeholder with your AdSense code

Example:
```html
<div class="ad-zone">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX"
       crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

## 🔧 Configuration Notes

### .htaccess
- Forces HTTPS (SSL required)
- Enables gzip compression
- Sets browser caching
- Adds security headers
- Redirects www to non-www

If you're using **Nginx** instead of Apache, you'll need different configuration. Let me know if you need help with that.

### SSL Certificate
Make sure you have an SSL certificate installed. Most hosts offer free Let's Encrypt SSL certificates:
- cPanel: SSL/TLS Status → Run AutoSSL
- Plesk: SSL/TLS Certificates → Let's Encrypt

## 📱 Features

- ✅ Track Klawerjas & Dominoes games
- ✅ Player name autocomplete (localStorage)
- ✅ Camera + Gallery photo upload
- ✅ Instagram square format export (1800x1800px)
- ✅ Auto-save player names
- ✅ Vark detection (single & double)
- ✅ Af instant-win (Klawerjas)
- ✅ Mobile-first responsive design
- ✅ AdSense-ready ad zones

## 🆘 Troubleshooting

**Problem**: 404 errors or broken links
- **Solution**: Make sure `index.html` is in the root directory

**Problem**: .htaccess not working
- **Solution**: Check if Apache has `mod_rewrite` enabled

**Problem**: Favicon not showing
- **Solution**: Hard refresh browser (Ctrl+Shift+R) or clear cache

**Problem**: No HTTPS
- **Solution**: Install SSL certificate from your hosting control panel

## 📞 Support

For issues or questions:
- Check your hosting provider's documentation
- Contact your web host support
- Test in incognito/private browsing mode

## 🎉 You're All Set!

Your Boom Scorer app is ready to go. Share it with your friends and enjoy tracking your Klawerjas and Dominoes games!

**Live URL**: https://boomscorer.fastbusiness.co.za

---

© 2026 Boom Scorer | Made in South Africa 🇿🇦
