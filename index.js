const puppeteer = require('puppeteer');
const fs = require('fs');
const request = require('request');
const Jimp = require('jimp');
//       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
async function getDemo(){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args:[
            '--start-maximized' // you can also use '--start-fullscreen'
         ],
        slowMo: 35
        // userDataDir: "./user_data"
    });
    const url = 'https://www.linkedin.com/login'
    const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768});
    await page.goto(url);
    await page.waitForSelector('#username')
    await page.waitForTimeout(1000)
    await page.type('#username', 'bot1@ofyou103.33mail.com')
    await page.waitForTimeout(1500)
    await page.type('#password', 'Taolabot1!')
    await page.waitForTimeout(700)
    await page.click('.btn__primary--large')
    // login xong
    // Truong hop khong mo full man hinh
    // await page.waitForSelector('.search-global-typeahead__collapsed-search-button-icon')
    
    // await page.waitForTimeout(500)
    // await page.click('.search-global-typeahead__collapsed-search-button-icon')
    // search
    await page.waitForSelector('.search-global-typeahead__input')
    await page.waitForTimeout(419)
    await page.type('.search-global-typeahead__input', 'Ngọc Châu')
    await page.keyboard.press('Enter', {delay: 80})
    // bam enter

    // truong hop search theo cong viec
    // await page.waitForSelector('.app-aware-link')
    // await page.waitForTimeout(3516)
    // await page.click('.search-results__cluster-bottom-banner')
    
    
    
    // Bam vao tai khoan dau tien
    await page.waitForSelector('.scaffold-layout__content')
    await page.waitForTimeout(1500)
    await page.click('.entity-result__content')
    // Tải pdf
    await page.waitForSelector('.pv-s-profile-actions__overflow-toggle')
    await page.waitForTimeout(1373)
    await page.click('.pv-s-profile-actions__overflow-toggle')
    await page.waitForSelector('.pv-s-profile-actions--save-to-pdf')
    await page.waitForTimeout(873)
    await page.click('.pv-s-profile-actions--save-to-pdf')
    
    // tải avatar
    await page.waitForTimeout(1553)
    const imgs = await page.$$eval('img.pv-top-card__photo[src]', imgs => imgs.map(img => img.getAttribute('src'))); 
    if (imgs[0] != `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`) 
    {
        await request(imgs[0]).pipe(fs.createWriteStream('test.png'))
        const image = await Jimp.read(imgs[0]);
        image.rotate(30)
                .crop(0, 155, 276, 101)
                .write("new.png"); 
    } 
    else{
        console.log("hinh dai dien mac dinh")
    }


    // them contact
    await page.waitForSelector('.pv-s-profile-actions--connect')
    await page.waitForTimeout(1373)
    await page.click('.pv-s-profile-actions--connect')
    await page.waitForTimeout(173)
    await page.waitForSelector('.artdeco-button--primary')
    await page.waitForTimeout(1053)
    await page.click('.artdeco-button--primary')


    await browser.close()
}

getDemo();