import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const Schedules = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://sis.materdeicollege.com/api/venues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // destructuring the data response from api
        const {
          venue
          
        } = data;

        setLoading(false);
        setVenue(venue);
        setSchedule(data.schedules);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-item-center">
        <h1 className="text-center w-100">
          Mater Dei College {venue.building}
        </h1>
        {error && (
          <p className="text-danger text-center">
            Something's wrong fetching the API
          </p>
        )}
        {loading && (
          <p className="text-white bg-primary text-center">
            Loading building and schedule record....
          </p>
        )}
        <table className="table text-center">
          <thead>
            <tr class="text-center bg-info">
              <td>No</td>
              <td>Name</td>
              <td>Building</td>
              <td>Capacity</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.building}</td>
              <td>{venue.capacity}</td>
            </tr>
          </tbody>
        </table>
        <h1
          className={
            schedule
              ? "text-center"
              : " text-center "
          }
        >
          {schedule ? "Schedules" : "No Schedule Found"}
        </h1>
        {schedule && (
          <table className="table table-striped text-center">
            <thead>
            <tr class="text-center bg-info">
              <td>ID</td>
              <td>Course No</td>
              <td>Description</td>
              <td>Schedule</td>
              <td>Size</td>
              <td>Teacher</td>
            </tr>
            </thead>
            <tbody>
              {Object.keys(schedule)?.map((sched, index) => {
                return (
                  <tr key={index}>
                    <td>{schedule[sched].id}</td>
                    <td>{schedule[sched].course_no}</td>
                    <td>{schedule[sched].description}</td>
                    <td>{schedule[sched].schedule}</td>
                    <td>{schedule[sched].size}</td>
                    <td>{schedule[sched].teacher}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/venues" className="btn btn-sm btn-primary mt-1">
        Back to Venues
      </Link>
    </>
  );
};

export default Schedules;