-- AlterTable
ALTER TABLE `Locacao` MODIFY `valorTotal` DECIMAL(10, 2) NOT NULL,
    MODIFY `status` ENUM('ATIVA', 'FINALIZADA') NOT NULL DEFAULT 'ATIVA';

-- AlterTable
ALTER TABLE `Usuario` MODIFY `nome` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(150) NOT NULL,
    MODIFY `senha` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Veiculo` MODIFY `marca` VARCHAR(50) NOT NULL,
    MODIFY `modelo` VARCHAR(80) NOT NULL,
    MODIFY `placa` VARCHAR(10) NOT NULL,
    MODIFY `valorDiaria` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE INDEX `Locacao_usuarioId_status_idx` ON `Locacao`(`usuarioId`, `status`);

-- CreateIndex
CREATE INDEX `Locacao_veiculoId_status_idx` ON `Locacao`(`veiculoId`, `status`);

-- AddCheckConstraint
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_valorDiaria_positivo_check` CHECK (`valorDiaria` > 0);

-- AddCheckConstraint
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_datas_check` CHECK (`dataDevolucaoPrevista` > `dataInicio`);

-- AddCheckConstraint
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_valorTotal_positivo_check` CHECK (`valorTotal` > 0);

-- AddCheckConstraint
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_status_devolucao_check` CHECK (
    (`status` = 'ATIVA' AND `dataDevolucaoEfetiva` IS NULL)
    OR (`status` = 'FINALIZADA' AND `dataDevolucaoEfetiva` IS NOT NULL)
);
