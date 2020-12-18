// Bayesian conversion rate pseudocode

/* Inputs: 
	- A_traffic
	- B_traffic
	- A_conversions
	- B_conversions
	- iterations: large integer for sampling rounds, default 10,000
	- confidence: between 0 and 1, level of confidence, default 0.95

Notes: 
	- set up to use "A" as baseline
	- I would recommend against "hacking" the confidence level - pick one or two values 
	  before running the calculations that correspond to how certain you care to be
	- inline comments with "#"

A_rates = []
B_rates = []
diffs = []
A_failures = A_traffic - A_conversions
B_failures = B_traffic - B_conversions

# sample from distributions - the 0.5 is added for a "noninformative prior" (you don't need to change)
for i in range(1, iterations):
	A_i = jStat.beta.sample(0.5 + A_conversions, 0.5 + A_failures)
	B_i = jStat.beta.sample(0.5 + B_conversions, 0.5 + B_failures)
	A_rates.append(A_i)
	B_rates.append(B_i)
	diffs.append(B_i - A_i)
end for

# quantile values at each tail
# e.g.: with default 95% confidence, you'd have lower of 0.025 and upper of 0.975
lower_tail = (1 - confidence) / 2
upper_tail = 1 - lower_tail

# individual confidence intervals for the groups
# helpful for knowing what the individual distributions are
A_lower = quantile(A_rates, lower_tail)
A_upper = quantile(A_rates, upper_tail)
B_lower = quantile(B_rates, lower_tail)
B_upper = quantile(B_rates, upper_tail)

# CI of the difference between groups
# this is what you'll care about - if this CI contains 0, then the results are not significant given your level of confidence
diff_lower = quantile(diffs, lower_tail)
diff_upper = quantile(diffs, upper_tail)

*/
