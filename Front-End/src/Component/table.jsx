import React from 'react'
import "./table.css"
export default function Table() {
  return (
    <table border="1" role="table">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">First Name</th>
      <th role="columnheader">Last Name</th>
      <th role="columnheader">Job Title</th>
      <th role="columnheader">Favorite Color</th>
      <th role="columnheader">Wars or Trek?</th>
      <th role="columnheader">Secret Alias</th>
      <th role="columnheader">Date of Birth</th>
      <th role="columnheader">Dream Vacation City</th>
      <th role="columnheader">GPA</th>
      <th role="columnheader">Arbitrary Data</th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="cell">James</td>
      <td role="cell">Matman</td>
      <td role="cell">Chief Sandwich Eater</td>
      <td role="cell">Lettuce Green</td>
      <td role="cell">Trek</td>
      <td role="cell">Digby Green</td>
      <td role="cell">January 13, 1979</td>
      <td role="cell">Gotham City</td>
      <td role="cell">3.1</td>
      <td role="cell">RBX-12</td>
    </tr>
    <tr role="row">
      <td role="cell">The</td>
      <td role="cell">Tick</td>
      <td role="cell">Crimefighter Sorta</td>
      <td role="cell">Blue</td>
      <td role="cell">Wars</td>
      <td role="cell">John Smith</td>
      <td role="cell">July 19, 1968</td>
      <td role="cell">Athens</td>
      <td role="cell">N/A</td>
      <td role="cell">Edlund, Ben (July 1996).</td>
    </tr>
    <tr role="row">
      <td role="cell">Jokey</td>
      <td role="cell">Smurf</td>
      <td role="cell">Giving Exploding Presents</td>
      <td role="cell">Smurflow</td>
      <td role="cell">Smurf</td>
      <td role="cell">Smurflane Smurfmutt</td>
      <td role="cell">Smurfuary Smurfteenth, 1945</td>
      <td role="cell">New Smurf City</td>
      <td role="cell">4.Smurf</td>
      <td role="cell">One</td>
    </tr>
    <tr role="row">
      <td role="cell">Cindy</td>
      <td role="cell">Beyler</td>
      <td role="cell">Sales Representative</td>
      <td role="cell">Red</td>
      <td role="cell">Wars</td>
      <td role="cell">Lori Quivey</td>
      <td role="cell">July 5, 1956</td>
      <td role="cell">Paris</td>
      <td role="cell">3.4</td>
      <td role="cell">3451</td>
    </tr>
    <tr role="row">
      <td role="cell">Captain</td>
      <td role="cell">Cool</td>
      <td role="cell">Tree Crusher</td>
      <td role="cell">Blue</td>
      <td role="cell">Wars</td>
      <td role="cell">Steve 42nd</td>
      <td role="cell">December 13, 1982</td>
      <td role="cell">Las Vegas</td>
      <td role="cell">1.9</td>
      <td role="cell">Under the couch</td>
    </tr>
  </tbody>
</table>
  )
}
