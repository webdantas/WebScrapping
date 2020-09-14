const express = require('express')
const cheerio = require('cheerio')
const download  = require('node-image-downloader')
const request = require('request')
// const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
    var url = "https://www.codingshiksha.com"

    request(url, (error, response, html) => {
        if (!error) {
            var $ = cheerio.load(html)
            var imagesrc = $(".oceanwp-about-me-avatar img").attr('src')

            download({
                imgs: [
                    {
                        uri:imagesrc
                    }
                ],
                dest:'./img'
            })
                .then((info) => {
                    console.log("Completo")
                    process.exit(1)
            })
        }
    })
    
})
  
app.listen(5000)
