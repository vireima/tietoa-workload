const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <span key={person.arvo1}>
        {person.arvo2} {person.message} {person.kommentti}
        {/* <button onClick={() => handleDelete(person.id)}>delete</button> */}
        <br />
      </span>
    ))}
  </div>
);

export default Persons;
