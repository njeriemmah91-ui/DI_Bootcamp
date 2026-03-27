import random


# -------------------------
# Gene Class
# -------------------------
class Gene:
    def __init__(self, value=None):
        self.value = value if value is not None else random.choice([0, 1])

    def mutate(self):
        # flip gene (0 -> 1, 1 -> 0)
        self.value = 1 - self.value

    def __str__(self):
        return str(self.value)


# -------------------------
# Chromosome Class
# -------------------------
class Chromosome:
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        for gene in self.genes:
            if random.random() < 0.5:  # 50% chance
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __str__(self):
        return "".join(str(gene) for gene in self.genes)


# -------------------------
# DNA Class
# -------------------------
class DNA:
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self):
        for chromosome in self.chromosomes:
            if random.random() < 0.5:  # 50% chance
                chromosome.mutate()

    def is_all_ones(self):
        return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

    def __str__(self):
        return "\n".join(str(chromosome) for chromosome in self.chromosomes)


# -------------------------
# Organism Class
# -------------------------
class Organism:
    def __init__(self, environment=0.5):
        self.dna = DNA()
        self.environment = environment  # probability to mutate

    def mutate(self):
        if random.random() < self.environment:
            self.dna.mutate()

    def is_perfect(self):
        return self.dna.is_all_ones()


# -------------------------
# Simulation
# -------------------------
def run_simulation(population_size=5, environment=0.7):
    organisms = [Organism(environment) for _ in range(population_size)]
    generations = 0

    while True:
        generations += 1

        for organism in organisms:
            organism.mutate()

            if organism.is_perfect():
                print("Perfect organism found!")
                print("Generations:", generations)
                print("\nFinal DNA:\n")
                print(organism.dna)
                return generations


# -------------------------
# Run
# -------------------------
if __name__ == "__main__":
    run_simulation(population_size=5, environment=0.7)