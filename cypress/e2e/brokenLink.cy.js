describe('Verify all broken link exits on the pages', () => {

  // store all the pages in an array to check the broken link all togather
  const pageToTestBrokenLink = ['/page1','/page2','/page3','/page4', '/page5'];
  var brokenLinks =[];
  pageToTestBrokenLink.forEach(page => {

    it('Verify broken link', () => {
      cy.visit('/')
      //findout all links on everypage

      cy.get('a[href]').each(($link)=>{
        const href = $link.prop('href');
        //verify if the link is valid
        if(href && href.startWith('http')){
          cy.request({
            url: href,
            failOnStatusCode:false,
          }).then((response)=>{
            if(response.status >= 400){
              brokenLinks.push({ link: href, status: response.status });
              cy.log(`Broken Links found: ${href} with status : ${response.status}`);
            }else{
              cy.log(`Valid Link with status: ${response.status} for - ${href}`);
            }
          })
        }
      })
    });
   })



  after(() => {
    if (brokenLinks.length) {
      cy.writeFile('cypress/results/broken-links.json', brokenLinks);
      cy.log('Broken links report generated:', brokenLinks);
    } else {
      cy.log('No broken links found.');
    }
  });
})