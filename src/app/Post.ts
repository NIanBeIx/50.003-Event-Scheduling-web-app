/** post = schedule vote */

/** should also be for viewing current schedule
 * so it should mod | periods | location | class 
 */


 
export interface Post{
    title:string;
    course: string;
    date_posted: Date;
    position: number;
    body: string;

    /** period:string; */

}
