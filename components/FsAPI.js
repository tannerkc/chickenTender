import Foursquare from "@foursquare/foursquare-places";
const request = require('request');

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const foursquare = new Foursquare(CLIENT_ID, CLIENT_SECRET);


const FsAPI = () => {
  const [items, setItems] = useState([]);
  let lo : Demo.props.coords.longitude;
  let la : Demo.props.coords.latitude;
  const [params, setParams] = useState({

    ll: "39.913744128264305,-83.0944013741042",
    // ll: la,lo,
    // query: "restaraunt",
    categoryId: '4d4b7105d754a06374d81259',
    limit: '10',

  });

  useEffect(() => {
    foursquare.venues.getVenues(params).then(res => {
      setItems(res.response.venues);
      console.log(res.response.venues);

    });
  }, [params]);

  // let distinctPlaces = [new Set(items.map(x => x.name))];
  // console.log(distinctPlaces);



  const distinctPlaces = [];

  for (const item of items) {

            request(
            {
              url: 'https://api.foursquare.com/v2/venues/'+item.id,
              method: 'GET',
              qs: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                // ll: "39.913744128264305,-83.0944013741042",
                // categoryId: '4d4b7105d754a06374d81259',
                v: '20200704',
                // limit: 50,
              },
            },
            function(err, res, body) {
              if (err) {
                console.error(err);
              } else {
                // console.log(body);
                const obj = JSON.parse(res.body);

                if(obj.response.venue['url']){
                  var placeURL = obj.response.venue['url'];
                }

                if(placeURL){
                  item['placeIMG'] = '//logo.clearbit.com/'+placeURL.substring(0, placeURL.indexOf('com')+3);
                  console.log(item['placeIMG']);
                }
                else{
                  item['placeIMG'] = "https://i.picsum.photos/id/417/400/500.jpg";
                }
              }
            }
          )

  }

  const map2 = new Map();

  for (const item1 of items) {
      if(!map2.has(item1.name)){
          map2.set(item1.name, true);    // set any value to Map

          console.log(item1.placeIMG);
          distinctPlaces.push({
              id: item1.id,
              name: item1.name,
              url: item1.placeIMG,
              location: item1.location['formattedAddress'],
              hereNow: item1.hereNow['summary'],
              verified: item1.verified
          });
      }
  }


  // const placesIDs = [];
  // const mapID = new Map();
  // for (const item of items) {
  //     if(!mapID.has(item.name)){
  //         mapID.set(item.name, true);    // set any value to Map
  //         placesIDs.push({
  //             id: item.id
  //         });
  //     }
  // }

  console.log(distinctPlaces);

  // distinctPlaces.map(({ id }) => (
  //
  // ))



  return (
    <div>
      <div>Items:</div>
      {distinctPlaces.map(({ id, name, url }) => (
        <React.Fragment>
        <img src={url} />
        <div key={id}>{name}</div>
        </React.Fragment>
      ))}
    </div>
  );
};


export default FsAPI
