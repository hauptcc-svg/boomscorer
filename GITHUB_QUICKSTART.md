# 🚀 Quick Start: Push to GitHub & Deploy

## Step 1: Push to GitHub (2 minutes)

```bash
cd /tmp/boomscorer

# Configure git with your details
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Boom Scorer v1.0"

# Add remote (if not done)
git remote add origin https://github.com/hauptcc-svg/boomscorer.git

# Push to GitHub
git push -u origin main
```

**If you get branch errors:**
```bash
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel (3 minutes)

### Quick Deploy:
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select **hauptcc-svg/boomscorer**
5. Click **"Deploy"**
6. Done! ✅

---

## Step 3: Add Domain (5 minutes)

### In Vercel:
1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `boomscorer.fastbusiness.co.za`

### At Your Domain Registrar:
Add this DNS record:
```
Type: CNAME
Name: boomscorer
Value: cname.vercel-dns.com
```

### Wait 5-10 minutes, then visit:
**https://boomscorer.fastbusiness.co.za** 🎉

---

## ⚡ That's It!

Total time: ~10 minutes

Your Boom Scorer is now LIVE! 🎯
