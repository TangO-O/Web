from flask import Flask,render_template
import sqlite3

app = Flask(__name__)


@app.route('/')
def index():
    num = []
    salary = []
    con = sqlite3.connect("51job.db")
    cur = con.cursor()
    sql = "select salary,count(salary) from tablename "
    data = cur.execute(sql)
    for item in data:
        num.append(str(item[1]))
        salary.append(str(item[0]))
    cur.close()
    con.close()
    return render_template("index.html", num=num, salary=salary)

@app.route('/index')
def home():
    # return render_template("index.html")
    return index()

@app.route('/tables')
def table():
    datalist = []
    con = sqlite3.connect("51job.db")
    cur = con.cursor()
    sql = "select * from tablename "
    data = cur.execute(sql)
    for item in data:
        datalist.append(item)
    cur.close()
    con.close()
    return render_template("tables.html",tables = datalist)

@app.route('/echarts_01')
def echarts_01():
        salary = []
        num = []
        con = sqlite3.connect("51job.db")
        cur = con.cursor()
        sql = "select salary,count (salary) from tablename group by salary"
        data = cur.execute(sql)
        for item in data:
            salary.append(str(item[0]))
            num.append(item[1])
        cur.close()
        con.close()
        return render_template("echarts_01.html",salary = salary,num = num)


@app.route('/echarts_02')
def echarts_02():
    salary = []
    num = []
    con = sqlite3.connect("51job.db")
    cur = con.cursor()
    sql = "select salary,count (salary) from tablename group by salary"
    data = cur.execute(sql)
    for item in data:
        salary.append(str(item[0]))
        num.append(item[1])
    cur.close()
    con.close()
    return render_template("echarts_02.html", salary=salary, num=num)


@app.route('/word')
def word():
    return render_template("word.html")

@app.route('/team')
def team():
    return render_template("team.html")



if __name__ == '__main__':
    app.run()
