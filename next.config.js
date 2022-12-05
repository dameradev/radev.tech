module.exports = {
  swcMinify: true,
  
  images: {
    domains: ["media.graphassets.com", "www.tum.thz.mybluehost.me", "s3.us-west-2.amazonaws.com", "res.cloudinary.com", "scontent.cdninstagram.com", "cdninstagram.com", "scontent.com", "scontent-iad3-2.cdninstagram.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}
