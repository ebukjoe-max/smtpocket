import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          {/* Meta tags */}
          <meta charSet='UTF-8' />
          <meta name='theme-color' content='#000000' />
          <meta
            name='description'
            content='Smart Pocket Investment,Loan and savings company.'
          />

          {/* Favicon */}
          <link
            rel='icon'
            href='https://res.cloudinary.com/da26wgev2/image/upload/v1761134034/receipts/bmnhjzee3cynfi5w3djz.png'
          />

          {/* Google Fonts Example */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
