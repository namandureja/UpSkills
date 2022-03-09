const { 
    LinkedinScraper,
    relevanceFilter,
    timeFilter,
    typeFilter,
    experienceLevelFilter,
    events,
} = require("linkedin-jobs-scraper");

const query = async (query,callback,loc)=>{

    const scraper = new LinkedinScraper({
        headless: true,
        args: [
            "--lang=en-GB",
            '--disable-setuid-sandbox',
            '--no-sandbox'
        ],
    });

    let result=[];

    scraper.on(events.scraper.data, (data) => {
        console.log(data);
        result.push({
            title : data.title,
            company  : data.company,
            place : data.place,
            link : data.link,
            date : data.date,
            applyLink  : data.applyLink ? data.applyLink : data.link,
            level : data.senorityLevel,
            type : data.employmentType,
            function : data.jobFunction
        });
    });

    scraper.on(events.scraper.error, (err) => {
        console.error(err);
    });

    scraper.on(events.scraper.end, async () => {
        callback(result);
        await scraper.close();
    });

    scraper.on(events.puppeteer.browser.targetcreated, () => {
    });
    scraper.on(events.puppeteer.browser.targetchanged, () => {
    });
    scraper.on(events.puppeteer.browser.targetdestroyed, () => {
    });
    scraper.on(events.puppeteer.browser.disconnected, () => {
    });

    const descriptionFn = () => document.querySelector(".description__text")
        .innerText
        .replace(/[\s\n\r]+/g, " ")
        .trim();

    await Promise.all([
        scraper.run([
            {
                query: query,
                options: {      
                }                                                       
            },
            
        ], { // Global options, will be merged individually with each query options
            locations: [loc],
            optimize: true,
            limit: 8,
        }),
    ]);

    // Close browser
    await scraper.close();
};

module.exports.search = query;