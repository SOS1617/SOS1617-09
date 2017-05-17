describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://sos1617-09.herokuapp.com/#!/internetandphones');
		/*element(by.model('apikeyField')).sendKeys('internetstats');*/
	
		/*element(by.buttonText('Access')).click().then(function (){*/
		var	internetandphones = element.all(by.repeater('stat in internetandphones'));
		expect(internetandphones.count()).toBeGreaterThan(3);
		});
	});
/*});*/