export default function generateSocialImage({
  title,
  cloudName,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  titleExtraConfig = '_bold',
  underlayImageWidth = 600,
  underlayImageHeight = 630,
  underlayImage = '',
  imageWidth = 1200,
  imageHeight = 630,
  textAreaWidth = 600,
  textAreaHeight = 450,
  textLeftOffset = 40,
  textBottomOffset = -40,
  textColor = 'FFFFFF',
  titleFontSize = 50
}): string {

  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'f_auto'
  ].join(',');

    // configure the underlay - the actual article banner
  const underlayClonfig = [
    `w_${underlayImageWidth}`,
    `h_${underlayImageHeight}`,
    `c_fill`,
    `u_${underlayImage}/fl_layer_apply`,
    `g_east`
  ];

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    `h_${textAreaHeight}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_west',
    `x_${textLeftOffset}`,
    `y_${textBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      title
    )}`
  ].join(',');

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    underlayClonfig,
    titleConfig,
    version,
    imagePublicID
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join('/');
}