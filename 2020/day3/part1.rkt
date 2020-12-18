#lang typed/racket

(require typed/test-engine/racket-tests)

(define lines (file->lines "puzzle-input.txt"))

(: count (-> Integer (Listof String) Integer Integer))
;; counts the number of trees encountered for a slope of
;;  3 right 1 down
;; note: col (column) must start at 0
(define (count acc lns col)
  (match lns
    ['() acc]
    [(cons ln t)
     (count
      (if (char=? #\# (string-ref ln (modulo (* 3 col) 31)))
          (add1 acc)
          acc)
      t (add1 col))]))

(: num-trees (-> (Listof String) Integer))
;; counts the number of trees encountered for a slope of
;;  3 right 1 down
(define (num-trees lns)
  (count 0 lines 0))

(test)