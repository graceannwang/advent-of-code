#lang typed/racket

(require typed/test-engine/racket-tests)

(define lines (file->lines "puzzle-input.txt"))

(: num-trees-1 (-> (Listof String) Integer Integer Integer Integer))
;; accumulator: N
;; list recursion: N (uses list-ref)
;; count starts at 1
(define (num-trees-1 lns count dx dy)
  (if (> count (floor (/ 322 dy)))
      0
      (local
        {(define row (list-ref lns (* dy count)))
         (define char (string-ref row (modulo (* dx count) 31)))
         (define tree? (char=? #\# char))}
       (if tree?
            (add1 (num-trees-1 lns (add1 count) dx dy))
            (num-trees-1 lns (add1 count) dx dy)))))

(check-expect (num-trees-1 lines 1 1 1) 80)
(check-expect (num-trees-1 lines 1 3 1) 270)
(check-expect (num-trees-1 lines 1 5 1) 60)
(check-expect (num-trees-1 lines 1 7 1) 63)
(check-expect (num-trees-1 lines 1 1 2) 26)

(: num-trees-2 (-> (Listof String) Integer Integer Integer Integer Integer))
;; accumulator: Y
;; list recursion: N (uses list-ref)
;; count starts at 1
(define (num-trees-2 lns acc count dx dy)
  (if (> count (floor (/ 322 dy)))
      acc
      (local
        {(define row (list-ref lns (* dy count)))
         (define char (string-ref row (modulo (* dx count) 31)))
         (define tree? (char=? #\# char))}
        (if tree?
            (num-trees-2 lns (add1 acc) (add1 count) dx dy)
            (num-trees-2 lns acc (add1 count) dx dy)))))

(check-expect (num-trees-2 lines 0 1 1 1) 80)
(check-expect (num-trees-2 lines 0 1 3 1) 270)
(check-expect (num-trees-2 lines 0 1 5 1) 60)
(check-expect (num-trees-2 lines 0 1 7 1) 63)
(check-expect (num-trees-2 lines 0 1 1 2) 26)

(: num-trees-3 (-> (Listof String) Integer Integer Integer Integer))
;; accumulator: N
;; list recursion: Y
;; count starts at 0
(define (num-trees-3 lns count dx dy)
  (match lns
    ['() 0]
    [(cons ln t)
     (if
      (and
       ;; checks whether this line should be considered
       (and (> count 0) (= (modulo count dy) 0))
       ;; checks whether the corresponding element in this line is a tree
       (char=? #\# (string-ref
                    ln (modulo (cast (* dx (/ count dy)) Integer) 31))))
      (add1 (num-trees-3 t (add1 count) dx dy))
      (num-trees-3 t (add1 count) dx dy))]))

(check-expect (num-trees-3 lines 0 1 1) 80)
(check-expect (num-trees-3 lines 0 3 1) 270)
(check-expect (num-trees-3 lines 0 5 1) 60)
(check-expect (num-trees-3 lines 0 7 1) 63)
(check-expect (num-trees-3 lines 0 1 2) 26)


(: num-trees-4 (-> (Listof String) Integer Integer Integer Integer Integer))
;; accumulator: Y
;; list recursion: Y
;; count starts at 0
;; most improved version of num-trees
(define (num-trees-4 lns acc count dx dy)
  (match lns
    ['() acc]
    [(cons ln t)
     (if
      (and
       ;; checks whether this line should be considered
       (and (> count 0) (= (modulo count dy) 0))
       ;; checks whether the corresponding element in this line is a tree
       (char=? #\# (string-ref
                    ln (modulo (cast (* dx (/ count dy)) Integer) 31))))
      (num-trees-4 t (add1 acc) (add1 count) dx dy)
      (num-trees-4 t acc (add1 count) dx dy))]))

(check-expect (num-trees-4 lines 0 0 1 1) 80)
(check-expect (num-trees-4 lines 0 0 3 1) 270)
(check-expect (num-trees-4 lines 0 0 5 1) 60)
(check-expect (num-trees-4 lines 0 0 7 1) 63)
(check-expect (num-trees-4 lines 0 0 1 2) 26)

(test)

;; 80, 270, 60, 63, 26