# Variáveis
HELM_RELEASE_NAME=splendor-gateway
HELM_CHART_PATH=./helm
NAMESPACE=microservices

# Targets
.PHONY: all install upgrade status uninstall

all: install

install:
	@echo "Instalando a liberação Helm $(HELM_RELEASE_NAME) no namespace $(NAMESPACE)..."
	helm install $(HELM_RELEASE_NAME) $(HELM_CHART_PATH) -n $(NAMESPACE)

upgrade:
	@echo "Atualizando a liberação Helm $(HELM_RELEASE_NAME) no namespace $(NAMESPACE)..."
	helm upgrade $(HELM_RELEASE_NAME) $(HELM_CHART_PATH) -n $(NAMESPACE)

status:
	@echo "Verificando o status da liberação Helm $(HELM_RELEASE_NAME) no namespace $(NAMESPACE)..."
	helm status $(HELM_RELEASE_NAME) -n $(NAMESPACE)

uninstall:
	@echo "Desinstalando a liberação Helm $(HELM_RELEASE_NAME) do namespace $(NAMESPACE)..."
	helm uninstall $(HELM_RELEASE_NAME) -n $(NAMESPACE)
