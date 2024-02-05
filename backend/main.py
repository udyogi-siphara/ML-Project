from flask import Flask, request, render_template

app = Flask(__name__)

categories = ['Bills', 'Groceries', 'Shopping', 'Electronic']

default_recommendations = [
    {'category': 'Groceries', 'item': 'Lunu', 'cost': 500},
    {'category': 'Shopping', 'item': 'Watch', 'cost': 1500},
]

user_salary = 0
expenses = []
budget_summary = {'remainingSalary': user_salary, 'expenses': []}


def check_for_alternatives(new_expense):
    alternative = next(
        (
            recommendation
            for recommendation in default_recommendations
            if (
                recommendation['category'] == new_expense['category']
                and recommendation['item'].lower() == new_expense['item'].lower()
                and recommendation['cost'] < new_expense['cost']
            )
        ),
        None,
    )

    if alternative:
        replace = input(
            f"Consider replacing {new_expense['item']} at ${new_expense['cost']} with {alternative['item']} at ${alternative['cost']}? (y/n): "
        )

        if replace.lower() == 'y':
            return alternative

    return None


@app.route('/', methods=['GET', 'POST'])
def main_form():
    global user_salary, expenses, budget_summary

    if request.method == 'POST':
        selected_category = request.form['selectedCategory']
        item = request.form['item']
        cost = request.form['cost']

        if selected_category.strip() == '' or item.strip() == '' or not cost.isdigit() or int(cost) <= 0:
            return 'Please enter a valid category, item, and cost.'

        new_expense = {'category': selected_category, 'item': item, 'cost': float(cost)}
        alternative = check_for_alternatives(new_expense)

        if alternative:
            expenses.append(alternative)
            remaining_salary = (
                user_salary - sum(expense['cost'] for expense in expenses) - alternative['cost']
            )
            budget_summary = {'remainingSalary': remaining_salary, 'expenses': expenses}
        else:
            expenses.append(new_expense)
            remaining_salary = user_salary - sum(expense['cost'] for expense in expenses) - new_expense['cost']
            budget_summary = {'remainingSalary': remaining_salary, 'expenses': expenses}

    return render_template('index.html', categories=categories, budget_summary=budget_summary)


if __name__ == '__main__':
    app.run(debug=True)
