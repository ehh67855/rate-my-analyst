import { Ai } from '@cloudflare/ai';
import { parseCSV } from './parsecsv'; // Import parseCSV function from csvParser.ts

interface Env {
  AI: any;
}

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    try {
		
      // Create an instance of the Ai class using the provided environment AI key
      const ai = new Ai(env.AI);

	  var prompt = "";

      // Example CSV data
      const csvData = `Name\tClass\tQUALITY\tDIFFICULTY\tComments
Suchi Bhandarkar\tCSCI1302\t2\t4\t"His lectures are easy to follow for the most part\t and the homework assignments can be completed in a couple hours if you read the textbook. The problem is that most of your grade is tied up in the exams which cover material that either has not appeared in lecture/hw\t or covers familiar material at a much more difficult level."
Suchi Bhandarkar\tCSCI4720\t1\t5\tDr. Suchi is a professor that does'n care about what he is teaching and he is not interested if the student understands or not. Do not even bother going to his office hours because he has nothing to offer you. I feel pained because Computer Architecture is a very fantastic course for CS student. Teaches A in Class text you on Z. Assignment on G.
Suchi Bhandarkar\tCSCI4721\t2\t4\ta very stressful class. Bhandarkar's lectures and slides have a ton of extra information that is not on the test. He assigned only 5 homework assignments the entire semester and did not provide any kind of study guide for the exams. Every exam I was very stressed that I was going to be surprised with a question that I did not study and I often was.
Suchi Bhandarkar\tCSCI4722\t2\t4\t"His lectures weren't totally useless\t just very broad. The assignments make you apply a lot of knowledge so you're forced to really teach yourself in preparation for them. I would avoid the lectures and opt for teaching myself instead as the assignments were much more difficult than what was being discussed. His class was not fun to go through."
Suchi Bhandarkar\tCSCI4723\t1\t4\t"The lectures are not very engaging\t but you need to be there to understand the content. Also he assigns a lot of homework. You are only graded on the homework and 3 tests (including the final which is 35% of your grade). The tests are completely short answer and include stuff never covered in lecture or the homework."
Laksmish Ramaswamy\tCSCI1302\t5\t1\tBest teacher ever!!
Laksmish Ramaswamy\tCSCI1303\t1\t5\tHe was terrible. Extremely hard to understand and unreliable. It takes weeks to get a grade back and his return policy for an e-mail is at the soonest 24 hours. The TA and tutor are just as useless. I'm actually taking a class over the summer to get out of having him again next semester.
Dan Everett\tCSCI1302\t4.5\t3\tDr. Dan seems to enjoy teaching. He lets out class early on most days. I learned mostly everything from the book and went to class for assignments. He assigned partners with every hw assignment.
Dan Everett\tCSCI4300\t5\t1\tThis man is a living legend. He is the nicest professor I have meet and doesn't have a bad bone in his body will help you if you do what you are suppose to
Dan Everett\tCSCI4301\t4\t3\tDr. Dan is a great person that's slightly unorganized but that's not entirely his fault (if you take his class you'll know why). He's an easy grader and is vague on what he wants because honestly he grades your effort.
Brad Barnes\tCSCI1302\t5\t3\t"If you're taking 1302\t take Dr. Barnes he is the best. His lectures are very useful and he is also very funny and engaging. The class overall isn't too bad\t there are lots of extra credit opportunities\t and office hours help. You can get an A as long as you put in the work and don't procrastinate on coding assignments."
\t\t4\t3\t"Good professor. Does not allow laptops to take notes\t so take cotterell instead if you prefer that. Hard projects make sure you start early. Lots of extra credit. Exams are a bit difficult and you don't have much time to take it. Otherwise this is a good class. Hard class but its what is expected as a CS major. Attendance required."
\t\t5\t3\tSuper nice guy and very helpful! One of the best professors at UGA and I wish he taught other classes besides 1302`;

      // Construct HTML content with input fields for course name and preferences
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Response</title>
        </head>
        <body>
          <h1>Enter Course Name and Preferences</h1>
          <form id="aiForm">
            <label for="courseName">Course Name:</label>
            <input type="text" id="courseName" name="courseName"><br><br>
            <label for="preferences">Preferences:</label>
            <textarea id="preferences" name="preferences"></textarea><br><br>
            <button type="submit">Submit</button>
          </form>
          <div id="aiResponse"></div>

          <script>
            // JavaScript to handle form submission
            document.getElementById('aiForm').addEventListener('submit', async function(event) {
              event.preventDefault(); // Prevent default form submission behavior

              // Get the course name from the input field
              const courseName = document.getElementById('courseName').value;

              try {
                // Call the parseCSV function with the course name
                const csvData = ${JSON.stringify(csvData)};
                const teachersForCourse = ${parseCSV.toString()}(csvData, courseName);
				prompt = JSON.stringify(teachersForCourse);
                // Display the result on the page
                document.getElementById('aiResponse').innerHTML = JSON.stringify(teachersForCourse);
              } catch (error) {
                console.error("Error parsing CSV:", error);
                // Display error message on the page if something goes wrong
                document.getElementById('aiResponse').innerHTML = 'Error parsing CSV';
              }
            });
          </script>
        </body>
        </html>
      `;

		console.log(prompt);
      // Return the HTML content as the response
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });

    } catch (error) {
      console.error("Error fetching or processing AI data:", error);
      // Return an error response if something goes wrong
      return new Response('Error fetching or processing AI data', { status: 500 });
    }
  },
};
