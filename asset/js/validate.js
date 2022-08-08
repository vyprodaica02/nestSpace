function validator(option) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  const selectorRules = {};
  function validates(inputElement, rule) {
    let errorMessage;
    const errorElement = getParent(
      inputElement,
      option.formGroupSelector
    ).querySelector(".form-message");
    const rules = selectorRules[rule.selector];
    for (let i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );

          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, option.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, option.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errorMessage;
  }

  const formElement = document.querySelector(option.form);
  if (formElement) {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();

      let isFormValid = true;

      option.rules.forEach(function (rule) {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validates(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        if (typeof option.onsubmit === "function") {
          const enableInputs = formElement.querySelectorAll("[name]");
          const formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            values[input.name] = input.value;
            return values;
          },
          {});
          option.onsubmit(formValues);
        } else {
          formElement.submit();
        }
      }
    });
    option.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      const inputElement = formElement.querySelector(rule.selector);
      const errorElement = getParent(
        inputElement,
        option.formGroupSelector
      ).querySelector(option.errorSelector);
      if (inputElement) {
        inputElement.addEventListener("blur", function () {
          validates(inputElement, rule);
        });
        inputElement.addEventListener("input", function () {
          errorElement.innerText = "";
          getParent(inputElement, option.formGroupSelector).classList.remove(
            "invalid"
          );
        });
      }
    });
  }
}

//rules
validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "vui lòng nhập lại";
    },
  };
};

validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || "vui lòng nhập Email";
    },
  };
};

validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};

validator.isConfirmation = function (selector, getconfirm, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getconfirm()
        ? undefined
        : message || "giá trị nhập vào không chính xác";
    },
  };
};

//submit alert

// const logout = document.querySelector(".logout");
// const alert = document.querySelector(".alert");

// logout.addEventListener("click", function () {
//   // alert.classList.add("hide");
// });
