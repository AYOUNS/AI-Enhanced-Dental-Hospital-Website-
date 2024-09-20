import React from 'react'

export default function book() {
    return <>
        <section className="book">
            
            <div className="layout position-relative">
                <div className="shape1 shape position-absolute bg-black"></div>
                <div className="shape2 shape position-absolute "></div>
                <div className="shape3 shape position-absolute"></div>
            </div>

            <div className="describeTheClink">
                <p>Teeth are the pieces of solid structures that form in the human mouth on the jaws, and are formed around the mouth and pharynx of vertebrate organisms. These teeth are used to grasp and chew food. They consist of several parts and have a certain number. Human teeth go through two stages, the first of which is the primary teeth in childhood, which They later fall out and a set of permanent teeth grow in their place. The two types differ from each other in that the primary teeth are smaller and have more pointed cusps. They are also whiter and more susceptible to erosion. They also contain relatively large pulp chambers compared to the small and sensitive roots.</p>
            </div>
            <div className="bookDoctor">
                <a href="#" className='book'><button className='btnBook'>Book An appointment</button></a>
            </div>
        </section>

    </>
}
