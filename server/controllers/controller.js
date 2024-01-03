import Questions from "../models/questionSchema.js"
import Results from "../models/resultSchema.js"
import questions, {answers} from '../database/data.js'

/*get all questions */
export async function getQuestions(req,res){
    try{
       
        const q = await Questions.find()
        res.json(q)
    }catch(error){
        res.json({error})
    }
}

/*insert all questions */
export async function insertQuestions(req, res) {
  try {
    // Assuming 'questions' and 'answers' are available from req.body or elsewhere
    const insertedData = await Questions.insertMany({ questions, answers });
    res.json({ msg: 'Data Saved Successfully..!', data: insertedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
}


/*Delete all questions */
export async function dropQuestions(req, res){
    // res.json('Questions api delete request')
    try{
        await Questions.deleteMany()
        res.json({msg: 'Questions deleted successfully!'})
    }catch(error){
        res.json({error})
    }
}

/*get all result */
export async function getResult(req,res){
   // res.json('result api get request')
   try{
     const r = await Results.find()
     res.json(r) 
   }catch(error){
    res.json({error})
   }
}

/*post all result */
// export async function storeResult(req,res){
//     //res.json('result api post request')
//     try{
//         const { username, result, attempts, points, archived } = req.body;
//         if(!username && !result) throw new Error('Data Not Provided')
//         Results.create({username, result, attempts, points, archived}, function(error, data){
//             res.json({msg: 'Result saved successfully...!'})
//         })

//     }catch(error){
//        res.json({error})
//     }
// }

// Import the Results model

// Retrieve all results
// export async function getResult(req, res) {
//   try {
//     const results = await Results.find();
//     res.json(results);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: 'Failed to retrieve results' });
//   }
// }

// Create a new result
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, archived } = req.body;
    if (!username && !result) throw new Error('Data Not Provided');
    const newResult = await Results.create({ username, result, attempts, points, archived });
    res.json({ msg: 'Result saved successfully...!', data: newResult });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' }); // Add more specific error message if possible
  }
}


/*delete all result */
export async function dropResult(req, res){
  //  res.json('result api delete request')
  try{
     await Results.deleteMany()
     res.json({msg: 'Result Deleted successfully...'})
  }catch(error){
    res.json({error})
  }
} 

