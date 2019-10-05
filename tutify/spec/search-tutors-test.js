import SearchResults from '../src/components/SearchResults/SearchResults';

import jasmineEnzyme from 'jasmine-enzyme';

describe('SearchResults test', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  // tests
  it('should be handling a value entered in the search bar', () => {
    const wrapper = shallow(<SearchResults />);
    
    // mock list of tutors data
    let testData = [
        {"first_name": "mo", "last_name":"alawami", "subject" : "math" },
        {"first_name": "pooja", "last_name":"patel", "subject" : "french" },
    ]
    // mock list result after search
    let testResults = [
        {"first_name": "mo", "last_name":"alawami", "subject" : "math" },
    ]

    // mock search term
    const mockedEvent = { target: { value: "m"} } 

    // Set the data in the state of the component
    wrapper.setState({ data: testData, filteredData: [] });

    // Simulate the event
    checkbox.find('InputBase').simulate('onChange', mockedEvent)

    // Verify if we got the expected result
    expect(wrapper.state().filteredData).equals(testResults);

  });
});