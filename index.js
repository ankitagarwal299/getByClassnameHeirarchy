// Import stylesheets
import './style.css';

// Write Javascript code!
const root = document.getElementById('root');

function getByClassNameHierarchy(element, classNames) {
  // get all the classnames
  const classArray = classNames.split('>');

  // pass the array as a reference
  const result = [];

  // traverse the dom from the root
  traverseDOM(element, classArray, 0, result);

  // return the result
  return result;
}

// helper function
function traverseDOM(curElem, classArray, index, result) {
  //base case
  if (!curElem) return;

  //base case to insert elements with last heirarchy class
  if (
    index == classArray.length - 1 &&
    Array.from(curElem.classList).includes(classArray[index])
  ) {
    result.push(curElem.getAttribute('id'));
    return;
  }

  for (let child of curElem.children) {
    if (Array.from(curElem.classList).includes(classArray[index])) {
      traverseDOM(child, classArray, index + 1, result); //find next class
    } else {
      traverseDOM(child, classArray, 0, result); //start all over again
    }
  }
}
//order matters
console.log(getByClassNameHierarchy(root, 'b>a')); //[]

console.log(getByClassNameHierarchy(root, 'a>b')); //["b-1"]

//must be direct children
console.log(getByClassNameHierarchy(root, 'a>c')); //["c-3"]

//no. of classes in the string doesnot matter
console.log(getByClassNameHierarchy(root, 'a>b>c')); //["c-1", "c-2"]
/*
Output:
[
  <div class="c" id="c-1"></div>,
  <div class="c" id="c-2"></div>,
  <div class="c" id="c-3"></div>
]
*/
