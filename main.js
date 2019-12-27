const Cookies = {
  set: function(b, c, a) {
    b = [encodeURIComponent(b) + "=" + encodeURIComponent(c)];
    a &&
      ("expiry" in a &&
        ("number" == typeof a.expiry &&
          (a.expiry = new Date(1e3 * a.expiry + +new Date())),
        b.push("expires=" + a.expiry.toGMTString())),
      "domain" in a && b.push("domain=" + a.domain),
      "path" in a && b.push("path=" + a.path),
      "secure" in a && a.secure && b.push("secure"));
    document.cookie = b.join("; ");
  },
  get: function(b, c) {
    for (
      var a = [], e = document.cookie.split(/; */), d = 0;
      d < e.length;
      d++
    ) {
      var f = e[d].split("=");
      f[0] == encodeURIComponent(b) &&
        a.push(decodeURIComponent(f[1].replace(/\+/g, "%20")));
    }
    return c ? a : a[0];
  },
  clear: function(b, c) {
    c || (c = {});
    c.expiry = -86400;
    this.set(b, "", c);
  }
};

let userObj = {};

const getUser = async email => {
  return fetch(`http://localhost:3000/api/user/email/${email}`)
    .then(response => response.json())
    .then(podaci => {
      return (userObj = podaci);
    });
};

//check email, and send respond that user is active
async function getInfo() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  Cookies.set("email", email);
  const user = await getUser(email);
  const body = { isActive: true };
  if (password == user.password) {
    await fetch(`http://localhost:3000/api/user/${user.id}`, {
      body: JSON.stringify(body),
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(console.log(await user.isActive))
      .then((window.location.href = "../home.html"));
  } else {
    alert("Wrong password!");
  }
}
async function getUserById(id) {
  return fetch(`http://localhost:3000/api/user/${id}`)
    .then(response => response.json())
    .then(podaci => {
      return podaci;
    });
}

async function username() {
  const cook = Cookies.get("email");

  // userObj = await getUser(cook)
  // const user = await getUserById(userByEmail.id)
  await getUser(cook).then(() => {
    document.getElementById("email_value").innerHTML =
      userObj.first + " " + userObj.last;
  });
}

$(function() {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    dateFormat: "mm yy",
    onClose: function(dateText, inst) {
      $(this).datepicker(
        "setDate",
        new Date(inst.selectedYear, inst.selectedMonth, 1)
      );
    }
  });
});

const getTransactionByDate = (year, month) => {
  return fetch(`http://localhost:3000/api/transaction/${year}/${month}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      UserId: userObj.id
    }
  })
    .then(response => response.json())
    .then(podaci => {
      return podaci;
    });
};

const trans = async () => {
  const date = document.getElementById("datepicker").value;
  const datespliter = date.split(" ");
  let datepick = await getTransactionByDate(datespliter[1], datespliter[0]);

  const $table = document.getElementById("Table");
  {
    for (let i = 0; i < datepick.length; i++) {
      const $table_row = document.createElement("tr");
      $table.appendChild($table_row);

      for (let j = 0; j < Object.values(datepick[i]).length; j++) {
        const $table_cell = document.createElement("td");
        $table_row.appendChild($table_cell);
        $table_cell.append(Object.values(datepick[i])[j]);
      }
    }
    document.body.appendChild($table);
  }
};

function searchFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("Table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function signout() {
  Cookies.clear("email");
  window.location.href = "../index.html";
}

username();
