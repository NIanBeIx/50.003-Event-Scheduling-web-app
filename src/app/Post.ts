/** post = schedule vote */

/** should also be for viewing current schedule
 * so it should mod | periods | location | class 
 */


 
export interface Post{
    
    position: number; 
    day: string;
    time: string;
    venue: string;
    instructor: string;
    course: string;

    /** period:string; */

}
