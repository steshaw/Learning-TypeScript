// An experiment with discrimated unions in TypeScript.

//
// Pretty well equivalent of the Haskell:
//
// data Lit
//   = LInt Integer
//   | LBool Bool
//
enum LitE {
  Int,
  Bool,
}
interface IntT {
  type: LitE.Int,
  value: number
}
interface BoolT {
  type: LitE.Bool,
  value: boolean
}
type Lit = IntT | BoolT
function IntC(value): IntT {
  return {
    type: LitE.Int,
    value: value
  };
}
function BoolC(value): BoolT {
  return {
    type: LitE.Bool,
    value: value
  };
}

function litToString(literal: Lit) {
  switch (literal.type) {
    case LitE.Int: return "" + literal.value;
    case LitE.Bool: return "" + literal.value;
    default: const _exhaustiveCheck: never = literal;
  }
}

//
// Pretty well equivalent of the Haskell:
//
// data Expr
//   = Lit Lit
//   | Var String
//   | App Expr Expr
//   | Lam String Expr
//
enum ExprE {
  Lit,
  Var,
  App,
  Lam,
}
interface LitT {
  type: ExprE.Lit,
  literal: Lit
}
interface VarT {
  type: ExprE.Var,
  name: string
}
interface AppT {
  type: ExprE.App,
  expr1: Expr,
  expr2: Expr,
}
interface LamT {
  type: ExprE.Lam,
  name: string,
  expr: Expr,
}
type Expr = LitT | VarT | AppT | LamT
function LitC(literal: Lit): LitT {
  return {
    type: ExprE.Lit,
    literal: literal
  };
}
function VarC(name): VarT {
  return {
    type: ExprE.Var,
    name: name
  };
}
function AppC(expr1, expr2): AppT {
  return {
    type: ExprE.App,
    expr1: expr1,
    expr2: expr2
  };
}
function LamC(name, expr): LamT {
  return {
    type: ExprE.Lam,
    name: name,
    expr: expr
  };
}

function exprToString(e: Expr) {
    switch (e.type) {
        case ExprE.Lit: return litToString(e.literal);
        case ExprE.Var: return e.name;
        case ExprE.App: return "(" + exprToString(e.expr1) + " " +
            exprToString(e.expr2) + ")";
        case ExprE.Lam: return "\\" + e.name + " -> " + exprToString(e.expr)
        default: const _exhaustiveCheck: never = e;
    }
}

// (\x. x) 1
var identity = LamC("x", VarC("x"))
var e = AppC(identity, LitC(IntC(1)))
console.log(exprToString(e))
