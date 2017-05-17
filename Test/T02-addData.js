var fs = require('fs');

function writeScreenShot(data, filename) {
	var stream = fs.createWriteStream(filename);
	stream.write(new Buffer(data, 'base64'));
	stream.end();
}

describe('Add stats', function() {
	it('should add a new stats', function() {
		browser.get('http://sos1617-09.herokuapp.com/#!/internetandphones');
		/*element(by.model('apikeyField')).sendKeys('internetstats');*/

		/*element(by.buttonText('Access')).click().then(function() {*/

			element.all(by.repeater('stat in internetandphone')).then(function(initialData) {
				browser.driver.sleep(2000);

				element(by.model('newStat.country')).sendKeys('austria');
				element(by.model('newStat.year')).sendKeys(2010);
				element(by.model('newStat.usageInternet')).sendKeys(75.2);
				element(by.model('newStat.usagephoneline')).sendKeys(40);

				element(by.buttonText('Add')).click().then(function() {

					element.all(by.repeater('stat in internetandphone')).then(function(internetandphones) {
						expect(internetandphones.length).toEqual(initialData.length + 1);
					});

				});

			});
		});

	});
	
/*});*/