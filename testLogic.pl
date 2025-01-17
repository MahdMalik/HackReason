% BEGIN queries.

% If the list is empty, the element cant be a member
-member(Element, []).
% If found the head and current element match, thats a rule now.
member(Element, [Element | T]).
% Otherwise, skip the head and keep searching.
member(Element, [H | T]) :- member(Element, T).

% Persistent deficits in social communication 
% and social interaction. 3/3 must be met.
social_emotional_deficits(X) :- member(social_emotional_deficits, X). 
non_verbal_comm_deficits(X) :- member(non_verbal_comm_deficits, X). 
rel_maintenance_deficits(X) :- member(rel_maintenance_deficits, X). 

% Restricted, repetitive patterns of behavior, 
% interests, or activities. 2/4 must be met (minimum). 
motor_stereotypes(X) :- member(motor_stereotypes, X). 
rigid_behaviour_patterns(X) :- member(rigid_behaviour_patterns, X). 
highly_perseverative_interests(X) :- member(highly_perseverative_interests, X). 
hyper_hyporeactivity(X) :- member(hyper_hyporeactivity, X). 

% BEGIN rules.

% Per the DSM-V, autism is defined as:
autism(X) :- 
    social_emotional_deficits(X),
    non_verbal_comm_deficits(X),
    rel_maintenance_deficits(X),
    restricted_patterns_behaviours(X).

% Define restricted_patterns_behaviours
restricted_patterns_behaviours(X) :-
    at_least_two_of_four(X).

at_least_two_of_four(X) :-
    motor_stereotypes(X),
    rigid_behaviour_patterns(X).
at_least_two_of_four(X) :-
    motor_stereotypes(X),
    highly_perseverative_interests(X).
at_least_two_of_four(X) :-
    motor_stereotypes(X),
    hyper_hyporeactivity(X).
at_least_two_of_four(X) :-
    rigid_behaviour_patterns(X),
    highly_perseverative_interests(X).
at_least_two_of_four(X) :-
    rigid_behaviour_patterns(X),
    hyper_hyporeactivity(X).
at_least_two_of_four(X) :-
    highly_perseverative_interests(X),
    hyper_hyporeactivity(X).?- autism([social_emotional_deficits, non_verbal_comm_deficits, rel_maintenance_deficits, motor_stereotypes, hyper_hyporeactivity]).